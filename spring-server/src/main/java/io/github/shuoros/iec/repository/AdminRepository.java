package io.github.shuoros.iec.repository;

import io.github.shuoros.iec.model.Admin;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminRepository extends MongoRepository<Admin, String> {

    @Query("{'username' : ?0}")
    List<Admin> findByUsername(int username);

    @Query("{'jwt' : ?0}")
    List<Admin> findByJwt(int jwt);

}
