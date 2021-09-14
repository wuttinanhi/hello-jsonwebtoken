const jwt = require("jsonwebtoken")
const util = require('util')

// util function
const JwtVerify = util.promisify(jwt.verify)
const Wait = (timeout) => new Promise(r => setTimeout(() => r(), timeout))

const Secret = "ThisIsSuperSecretABC12345"

const Payload = {
    foo: "bar",
    test: "abc",
    bool: true,
    num: 128
}

const SignOptions = {
    algorithm: "HS256",
    expiresIn: "2s"
}

const VerifyOptions = {
    algorithms: ["HS256"],
    ignoreExpiration: false
}

async function Main(){
    // encrypt payload
    const EncryptedJwt = jwt.sign(Payload, Secret, SignOptions);
    console.log(EncryptedJwt)

    // decrypt payload
    const DecryptedJwt = await JwtVerify(EncryptedJwt, Secret, VerifyOptions);
    console.log(DecryptedJwt)
    
    // wait for jwt expired
    await Wait(3000)
    
    // decrypt expect error
    const DecryptedAgainJwt = await JwtVerify(EncryptedJwt, Secret, VerifyOptions).catch((e) => {
        console.log("ERROR:", e.name)
        return e
    })
    console.log(DecryptedAgainJwt)
}

Main()
