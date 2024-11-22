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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import dev.fullstackcoder.content_calendar.model.Content;
import dev.fullstackcoder.content_calendar.service.IContentService;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/api/content")
@CrossOrigin()
public class ContentController {

    private final IContentService contentService;

    public ContentController(IContentService contentService) {
        super();
        this.contentService = contentService;
    }

    @GetMapping("")
    public List<Content> getContent(
        @RequestParam(defaultValue = "10") int limit, 
        @RequestParam(defaultValue = "0" ) int offset) {
        return contentService.getContent(limit, offset);
    }
    
    @GetMapping("/{id}")
    public Content getContentById(@PathVariable Long id) {
        Content content = contentService.getContentById(id);
        if (content == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Content not found");
        }
        return content;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("")
    public Content addContent(@Valid @RequestBody Content content) {
        contentService.addContent(content);
        return content;
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/{id}")
    public void putMethodName(@Valid @PathVariable Long id, @RequestBody Content content) {
        if (contentService.getContentById(id) == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Content not found");
        }   
        contentService.updateContent(content);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteContent(@PathVariable Long id) {
        if (contentService.getContentById(id) == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Content not found");
        }
        contentService.deleteContent(id);
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
