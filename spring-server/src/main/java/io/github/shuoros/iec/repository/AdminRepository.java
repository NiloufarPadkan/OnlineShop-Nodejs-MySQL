package io.github.shuoros.iec.repository;

import io.github.shuoros.iec.model.Admin;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends MongoRepository<Admin, String> {
}
