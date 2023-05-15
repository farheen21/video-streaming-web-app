package com.webapp.application.videostreamingwebapp.repository;

import com.webapp.application.videostreamingwebapp.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
}
