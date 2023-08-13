package com.bitc.project_inside.controller;

import com.bitc.project_inside.data.DTO.ChallengeRequest;
import com.bitc.project_inside.data.entity.ChallengeEntity;
import com.bitc.project_inside.service.LeeService;
import lombok.RequiredArgsConstructor;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.net.HttpURLConnection;
import java.time.Duration;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@CrossOrigin(value = "http://localhost:3000")
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/server")
public class LeeController {

    private final LeeService leeService;

    @RequestMapping(value="/challengeList", method = RequestMethod.GET)
    public Object selectChallengeList() throws Exception {
        List<ChallengeEntity> challenge = leeService.selectChallengeList();
        return challenge;
    }

    @RequestMapping(value="/challengeListClass", method = RequestMethod.GET)
    public Object selectChallengeListClass(
            @RequestParam(value = "id") String id,
            @RequestParam(value = "challengeClass") int challengeClass,
            @RequestParam(value = "solvedState") int solvedState
    ) throws Exception { // 9는 아무런 값 없는것임
        List<ChallengeEntity> challenge = null;

        if (challengeClass == 9 && solvedState != 9) {
            challenge = leeService.selectChallengeListSolvedState(id, solvedState);
        }
        else if (challengeClass != 9 && solvedState == 9) {
            challenge = leeService.selectChallengeListClass(challengeClass);
        }
        else if (challengeClass != 9 && solvedState != 9) {
            challenge = leeService.selectChallengeListClassSolvedState(challengeClass, solvedState);
        }
        else {
            challenge = leeService.selectChallengeList();
        }

        return challenge;
    }






    @RequestMapping(value = "/challenge", method = RequestMethod.GET)
    public Object selectChallenge(@RequestParam(value = "idx") int idx) throws Exception {
        ChallengeEntity challenge = leeService.selectChallenge(idx);    // DTO 말고 Entity 사용할 것
        return challenge;
    }

    @RequestMapping(value = "/challenge", method = RequestMethod.POST)
    public String codeRunner(@RequestBody Map<String, String> requestData) {
        System.out.println("================크롤링 시작================");

        String language = requestData.get("language");
        String code = requestData.get("code");

        System.out.println("언어 : " + requestData.get("language"));
        System.out.println("코드 : " + requestData.get("code"));

        //세션 시작
        ChromeOptions options = new ChromeOptions();
        //페이지가 로드될 때까지 대기
        //Normal: 로드 이벤트 실행이 반환 될 때 까지 기다린다.
        options.setPageLoadStrategy(PageLoadStrategy.NORMAL);
//        options.addArguments("--window-size=1920,1080"); // 원하는 크기로 설정
        options.addArguments("--headless");   // 창 없이 실행
//        options.addArguments("--disable-extensions"); // 확장 프로그램 비활성화
//        options.addArguments("--disable-dev-shm-usage"); // 공유 메모리 사용 비활성화
//        options.addArguments("--remote-allow-origins=*");
        // 확장프로그램 zip 파일 경로(확장프로그램 활성화 시 headless 불가, 안되는게 있을땐 불필요한 기능 천천히 지워보기)
//        String extensionPath = "src/main/project_inside_react/src/chromeDriver/gleekbfjekiniecknbkamfmkohkpodhe.zip";
//        options.addExtensions(new File(extensionPath));

        // 웹드라이버(java)(서순 중요)
        WebDriver driver = new ChromeDriver(options);
//        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10)); // 대기 시간을 10초로 설정
        // 코드실행기 페이지
        driver.get("https://wandbox.org/");   // 컴파일 페이지
//        driver.get("http://localhost:3000/iframe");   // iframe 주소는 컴파일 페이지가 계속 바뀔때 사용
        // 대기 설정
        driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
        // iframe id를 이용해 iframe으로 프레임 전환
//        driver.switchTo().frame(driver.findElement(By.id("iframe")));
        // 반환받을 변수
        String result = "";

        try {
            // 해쉬코드
//            Select selectOptions = new Select(driver.findElement(By.className("selectpicker")));
//            System.out.println("기본 셀렉트옵션 : " + selectOptions.getFirstSelectedOption().getText());
//
//            selectOptions.selectByVisibleText(language);  // 언어 정보 선택
//            System.out.println("변경 셀렉트옵션 : " + driver.findElement(By.className("filter-option")));  // 굿
//
//
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
//            WebElement codeMirror = driver.findElement(By.className("CodeMirror-line"));
////            WebElement codeMirror = driver.findElement(By.cssSelector("#editor > textarea"));
//            WebElement codeMirrorr = wait.until(ExpectedConditions.elementToBeClickable(By.className("CodeMirror-line")));
//
//
//            codeMirrorr.click();    // 코드 실행창 기존 내용 지우기 --이까지 실행됨(내가 정하는 html 코드 에따라 실행의정도가 다름 아마 텍스트가 진짜로 입력이 되는 태그가 있을 건데 그걸 찾아야 하는듯, 입력이나 삭제 이벤트가 안먹는게 아니라 태그가 적절치 않은건가)
//            codeMirrorr.sendKeys(Keys.chord(Keys.LEFT_CONTROL + "a"));
////            codeMirror.clear();    //
//            codeMirrorr.sendKeys(code);
//            System.out.println("코드 : " + codeMirrorr);  // 코드 내용 입력
//


////            List<WebElement> tags = driver.findElements(By.className("CodeMirror-line"));   // 가져올때는 이대로 가져와서 사용해도 될듯
////            for(int i = 0; i < tags.size(); i++) {
////                System.out.println("코드 : " + tags.get(i).getText());
////            }
//
////                String outputGuide = driver.findElement(By.id("output")).findElement(By.className("guide")).getText();
////                System.out.println("아웃풋 : " + driver.findElement(By.id("output")).findElement(By.className("guide")).getText());   // 굿
//
//
//            WebElement output = driver.findElement(By.id("output"));
//            System.out.println("아웃풋 부모 : " + output);
//
//            driver.findElement(By.id("run")).click();   // 코드 실행
//
////                System.out.println("Test : " + output.findElement(By.className("console-wall-time")).getText().length());
//
//            if (output.findElement(By.className("console-wall-time")).getText().length() == 17) {
//                String outputGuide = driver.findElement(By.id("output")).findElement(By.className("guide")).getText();
//                System.out.println("가이드 : " + driver.findElement(By.id("output")).findElement(By.className("guide")).getText());   // 굿
//            } else {
//                String pre = driver.findElement(By.id("output")).findElement(By.className("console-content")).getText();
//                System.out.println("아웃풋 : " + pre);
//            }
//
////                // 대기 시간 설정 (값이 변할 때마다 반복 주기)
////                wait.until(ExpectedConditions.stalenessOf(outputGuide));
////            Thread.sleep(5000); // 5초 대기 (사실상 뷰가 생기며 필요 없어짐)
//
//            // 페이지를 새로고침하여 값이 변경되었는지 확인
////                driver.navigate().refresh();



            // 완드박스
            List<WebElement> btnLang = driver.findElements(By.className("list-group-item"));
            WebElement cm = driver.findElement(By.className("cm-activeLine"));

            cm.click(); // 코드 입력창 클릭
            cm.sendKeys(code);  // 코드 입력

            for (WebElement i : btnLang) {
                String btnLangText = i.getText();
                if (btnLangText.equals(language)) {
                    i.click();  // 언어 선택

                    WebElement btnRun = driver.findElement(By.cssSelector("#wb-main-content > div.d-flex.flex-column.flex-md-row.gap-16px > div.flex-grow-1.d-flex.flex-column.gap-8px > div:nth-child(4) > button"));
                    btnRun.click(); // 실행버튼 클릭

                    result = driver.findElement(By.cssSelector("#wb-result-console > pre")).getText();
                    System.out.println("아웃풋 : " + result); // 결과 받아오기

                    break;
                }
            }
        }
        finally {
            driver.quit();
        }
        return result;
    }
}
