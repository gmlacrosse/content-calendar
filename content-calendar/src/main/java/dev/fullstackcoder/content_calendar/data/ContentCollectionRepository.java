package dev.fullstackcoder.content_calendar.data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import dev.fullstackcoder.content_calendar.model.Content;
import dev.fullstackcoder.content_calendar.model.Status;
import dev.fullstackcoder.content_calendar.model.Type;
import jakarta.annotation.PostConstruct;

@Repository
public class ContentCollectionRepository {

    private final List<Content> contentList = new ArrayList<>();

    public ContentCollectionRepository() {
    }

    public List<Content> getAllContent() {
        return contentList;
    }

    public <Optional> Content getContentById(Integer id) {
        return contentList.stream().filter(c -> c.id().equals(id)).findFirst().orElse(null);
    }

    public void addContent(Content content) {
        contentList.add(content);
    }

    public void updateContent(Content content) {
        Content existingContent = contentList.stream().filter(c -> c.id().equals(content.id())).findFirst().orElse(null);
        if (existingContent != null) {
            contentList.remove(existingContent);
            contentList.add(content);
        }
    }

    public void deleteContent(Integer id) {
        Content existingContent = contentList.stream().filter(c -> c.id().equals(id)).findFirst().orElse(null);
        if (existingContent != null) {
            contentList.remove(existingContent);
        }
    }
    
    @PostConstruct
    private void init() {
        contentList.add(new Content(1, "First Content", "This is the first content", Status.IDEA, Type.ARTICLE,
                LocalDateTime.now(), LocalDateTime.now(), "https://www.google.com"));
        contentList.add(new Content(2, "Second Content", "This is the second content", Status.IN_PROGRESS, Type.VIDEO,
                LocalDateTime.now(), LocalDateTime.now(), "https://www.google.com"));
        contentList.add(new Content(3, "Third Content", "This is the third content", Status.COMPLETED, Type.PODCAST,
                LocalDateTime.now(), LocalDateTime.now(), "https://www.google.com"));
        contentList.add(new Content(4, "Fourth Content", "This is the fourth content", Status.PUBLISHED, Type.EVENT,
                LocalDateTime.now(), LocalDateTime.now(), "https://www.google.com"));
    }
}
