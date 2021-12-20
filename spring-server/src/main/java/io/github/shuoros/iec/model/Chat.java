package io.github.shuoros.iec.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Chat {

    @Id
    private String id;
    private String admin;
    private String user;
    private String message;
    private Date date;

}
