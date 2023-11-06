package com.dinary.diary.Controller;

import com.dinary.diary.dto.DiaryDTO;
import com.dinary.diary.service.DiaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/dinary")
public class DiaryController {
    private final DiaryService diaryService;
    
    @GetMapping("/save")
    public String saveForm() { return "save"; }

    @PostMapping("/save")
    public String save(@ModelAttribute DiaryDTO diaryDTO) throws IOException {
        System.out.println("diaryDTO = "+ diaryDTO);
        diaryService.save(diaryDTO);
        return "index";
    }

    @GetMapping("/")
    public String findAll(Model model) {
        List<DiaryDTO> diaryDTOList = diaryService.findAll();
        model.addAttribute("diaryList", diaryDTOList);
        return "paging";
    }

    @GetMapping("/{id}")
    public String findById(@PathVariable Long id, Model model,
                           @PageableDefault(page = 1) Pageable pageable) {
        DiaryDTO diaryDTO = diaryService.findById(id);
        model.addAttribute("diary", diaryDTO);
        model.addAttribute("page", pageable.getPageNumber());
        return "detail";
    }

    @GetMapping("/update/{id}")
    public String updateForm(@PathVariable Long id, Model model) {
        DiaryDTO diaryDTO = diaryService.findById(id);
        model.addAttribute("diaryUpdate", diaryDTO);
        return "update";
    }

    @PostMapping("/update")
    public String update(@ModelAttribute DiaryDTO diaryDTO, Model model) {
        DiaryDTO diary = diaryService.update(diaryDTO);
        model.addAttribute("diary", diary);
        return "detail";
    }

    @GetMapping("/delete/{id}")
    public String delete(@PathVariable Long id) {
        diaryService.delete(id);
        return "index";
    }

    @GetMapping("/paging")
    public String paging(@PageableDefault(page = 1) Pageable pageable, Model model) {
        Page<DiaryDTO> diaryList = diaryService.paging(pageable);
        int blockLimit = 3;
        int startPage = (int) (Math.ceil((double)pageable.getPageNumber() / blockLimit) - 1) * blockLimit + 1;
        int endPage = ((startPage + blockLimit - 1) < diaryList.getTotalPages()) ? startPage + blockLimit - 1 : diaryList.getTotalPages();
        model.addAttribute("diaryList", diaryList);
        model.addAttribute("startPage", startPage);
        model.addAttribute("endPage", endPage);
        return "paging";
    }
}
