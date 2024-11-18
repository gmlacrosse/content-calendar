package dev.fullstackcoder.content_calendar.controller;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import dev.fullstackcoder.content_calendar.data.ContentCollectionRepository;
import dev.fullstackcoder.content_calendar.model.Content;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/api/content")
@CrossOrigin(origins = "http://localhost:3000")
public class ContentController {

    private final ContentCollectionRepository contentCollectionRepository;

    public ContentController(ContentCollectionRepository contentCollectionRepository) {
        this.contentCollectionRepository = contentCollectionRepository;
    }

    @GetMapping("")
    public List<Content> getAllContent() {
        return contentCollectionRepository.getAllContent();
    }
    
    @GetMapping("/{id}")
    public Content getContentById(@PathVariable Integer id) {
        Content content = contentCollectionRepository.getContentById(id);
        if (content == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Content not found");
        }
        return content;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("")
    public Content addContent(@RequestBody Content content) {
        contentCollectionRepository.addContent(content);
        return content;
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/{id}")
    public void putMethodName(@PathVariable Integer id, @RequestBody Content content) {
        if (contentCollectionRepository.getContentById(id) == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Content not found");
        }   
        contentCollectionRepository.updateContent(content);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteContent(@PathVariable Integer id) {
        if (contentCollectionRepository.getContentById(id) == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Content not found");
        }
        contentCollectionRepository.deleteContent(id);
    }

    @GetMapping("/status")
    public String[] getStatus() {
        return new String[] { "IDEA", "IN_PROGRESS", "COMPLETED", "PUBLISHED" };
    }

    @GetMapping("/type")
    public String[] getType() {
        return new String[] { "ARTICLE", "VIDEO", "PODCAST", "EVENT" };
    }
}
