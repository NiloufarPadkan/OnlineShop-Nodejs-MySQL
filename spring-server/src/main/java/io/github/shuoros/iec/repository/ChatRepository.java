package io.github.shuoros.iec.repository;

import io.github.shuoros.iec.model.Chat;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRepository extends MongoRepository<Chat, String> {
}
