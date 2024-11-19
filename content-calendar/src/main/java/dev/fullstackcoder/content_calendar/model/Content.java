package dev.fullstackcoder.content_calendar.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Content {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    private String title;
    private String description;
    @Enumerated(EnumType.STRING)
    private Status status;
    @Enumerated(EnumType.STRING)
    private ContentType contentType;
    private LocalDateTime dateCreated;
    private LocalDateTime dateUpdated;
    private String url;

    @Override
    public String toString() {
        return "Content [id=" + id + ", title=" + title + ", description=" + description + ", status=" + status
                + ", contentType=" + contentType + ", dateCreated=" + dateCreated + ", dateUpdated=" + dateUpdated
                + ", url=" + url + "]";
    }
}

