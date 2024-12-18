import { JWTTokenService } from "./services/JWTTokenService";
import { JWTUtils } from "./utils/JWTUtils";

const test = async () => {
    try {
        const token = JWTTokenService.createToken(
            {
                id: '1234',
                username: 'saicharan',
                email: 'saicharan@gmail.com',
                role: 'Email'
            },
            '30000'
        );

        return token;

    } catch (err) {
        console.log('Error', err);
        throw err;
    }
}

const testValidToken = async () => {

    const token = await JWTTokenService.createToken({
        id: '1122',
        username: 'samuel',
        email: 'samuel@example.com',
        role: 'admin'
    },
        '3000'
    );

    try {
        const decodedToken = JWTTokenService.verifyToken(token);
        console.log('Verified Token:', decodedToken);
        return decodedToken;
    } catch (err) {
        console.log('Token verification failed:', err);
        throw err;
    }
};

const testExpiredToken = async () => {
    const token = await JWTTokenService.createToken({
        id: '2233',
        username: 'lisa',
        email: 'lisa@example.com',
        role: 'user'
    }, '1s'); 

    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
        const decodedToken = JWTTokenService.verifyToken(token);
        console.log('Verified Token:', decodedToken);
        return decodedToken;
    } catch (err: any) {
        console.log('Token verification failed (expected expired token):', err.message);
        throw err;
    }
};

const testDecodeToken = async () => {
    const token = await JWTTokenService.createToken({
        id: '3344',
        username: 'george',
        email: 'george@example.com',
        role: 'moderator'
    },
        '50000'
    );

    const decodedToken = JWTUtils.decodeToken(token);
    console.log('Decoded Token:', decodedToken);

    return decodedToken;
};

const testCustomClaims = async () => {
    const token = await JWTTokenService.createToken({
        id: '4455',
        username: 'rachel',
        email: 'rachel@example.com',
        role: 'admin',
    }, '80000'
);

    const decodedToken = JWTUtils.decodeToken(token);
    const customClaim = JWTUtils.getCustomClaim(decodedToken as object, 'some-custom-claim-value');

    console.log('Custom Claim:', customClaim);
    return customClaim;
};

test()
    .then((data) => {
        console.log('Token:', data);
    })
    .catch((err) => {
        console.log('Test failed', JSON.stringify(err));
    });

testValidToken()
    .then((decodedToken) => console.log('Test passed: Token is valid'))
    .catch((err) => console.log('Test failed:', err));

testExpiredToken()
    .then(() => console.log('Test failed: Token should have expired'))
    .catch((err) => console.log('Test passed: Token expired and invalidated', err.message));

testDecodeToken()
    .then((decodedToken) => console.log('Test passed: Token decoded successfully', decodedToken))
    .catch((err) => console.log('Test failed:', err));

testCustomClaims()
    .then((customClaim) => console.log('Test passed: Custom claim extracted', customClaim))
    .catch((err) => console.log('Test failed:', err))
