package com.webapp.application.videostreamingwebapp.config;

import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidatorResult;
import org.springframework.security.oauth2.jwt.Jwt;

/**
 * The AudienceValidator class is an implementation of OAuth2TokenValidator that validates the audience
 * of a JWT token.
 */
public class AudienceValidator implements OAuth2TokenValidator<Jwt> {
    private final String audience;
    public AudienceValidator(String audience) {
        this.audience = audience;
    }

    /**
     * This function validates if the audience of a given JWT token matches a specified audience.
     * 
     * @param token The "token" parameter is a JWT (JSON Web Token) that needs to be validated. It
     * contains information about the user and their permissions, as well as a signature to ensure its
     * authenticity.
     * @return The `validate` method is returning an `OAuth2TokenValidatorResult` object. If the
     * audience of the provided JWT token contains the specified audience, the method returns a
     * successful result using the `OAuth2TokenValidatorResult.success()` method. Otherwise, it returns
     * a failure result with an `OAuth2Error` object indicating that the audience is invalid for the
     * given token.
     */
    @Override
    public OAuth2TokenValidatorResult validate(Jwt token) {
        if(token.getAudience().contains(audience)){
            return OAuth2TokenValidatorResult.success();
        }
        return OAuth2TokenValidatorResult.failure(new OAuth2Error("Invalid audience for the given token"));
    }
}
