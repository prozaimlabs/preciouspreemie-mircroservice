import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError, validateRequest } from '@prozaimlabs/common';
import { User } from '../models/user';
import { PasswordManager } from '../utils/password-manager';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post(
    '/api/users/signin',
    [
        body('email').isEmail().withMessage('Email address must be valid'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('You must supply a password'),
    ],
    validateRequest,
    async (request: Request, response: Response) => {
        const { email, password } = request.body;

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            throw new BadRequestError('Invalid Signin Credentials!');
        }

        const passwordsMatch = await PasswordManager.compare(
            existingUser.password,
            password
        );
        if (!passwordsMatch) {
            throw new BadRequestError('Invalid Signin Credentials');
        }

        // Generate JWT
        const userJwt = jwt.sign(
            { id: existingUser.id, email: existingUser.email },
            process.env.JWT_KEY!
        );

        // store it on session object
        request.session = {
            jwt: userJwt,
        };

        response.status(200).send(existingUser);
    }
);

export { router as signinRouter };
