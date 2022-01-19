package io.github.shuoros.iec.repository;

import io.github.shuoros.iec.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    @Query("{'username' : ?0}")
    List<User> findByUsername(int username);

    @Query("{'jwt' : ?0}")
    List<User> findByJwt(int jwt);

}
