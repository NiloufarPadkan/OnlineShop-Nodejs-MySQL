package io.github.shuoros.iec.repository;

import io.github.shuoros.iec.model.Client;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientRepository extends MongoRepository<Client, String> {


    @Query("{'username' : ?0}")
    List<Client> findByUsername(String username);

}
