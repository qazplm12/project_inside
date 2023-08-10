package com.bitc.project_inside.controller;

import lombok.RequiredArgsConstructor;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.time.Duration;
import java.util.List;
import java.util.concurrent.TimeUnit;

@CrossOrigin(value = "http://localhost:3000")
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/server")
public class LeeController {
    @RequestMapping(value = "/codeRunner", method = RequestMethod.GET)
    public String codeRunner() throws Exception {


        return "success";
    }

    @RequestMapping(value = "/test", method = RequestMethod.POST)
    public void test(
            @RequestParam(value = "language") String language,
            @RequestParam(value = "code") String code
    ) {
        System.out.println("================크롤링 시작================");
        System.out.println("언어 : " + language);
        System.out.println("코드 : " + code);

        //세션 시작
        ChromeOptions options = new ChromeOptions();
        //페이지가 로드될 때까지 대기
        //Normal: 로드 이벤트 실행이 반환 될 때 까지 기다린다.
//        options.setPageLoadStrategy(PageLoadStrategy.NORMAL);
//        options.addArguments("headless");   // 창 없이 실행
        options.addArguments("--remote-allow-origins=*");
        // 확장프로그랩 zip 파일 경로
        String extensionPath = "src/main/project_inside_react/src/chromeDriver/gleekbfjekiniecknbkamfmkohkpodhe.zip";
        options.addExtensions(new File(extensionPath));

        // 웹드라이버(java)(서순 중요)
        WebDriver driver = new ChromeDriver(options);
        // javascript
//        WebDriver javascript = new ChromeDriver(options);
        // python
//        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10)); // 대기 시간을 10초로 설정
        // 코드실행기 페이지
        driver.get("http://localhost:3000/iframe");   // 컴포넌트 주소를 주면 되려나
        // 대기 설정
        driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
        // iframe id를 이용해 iframe으로 프레임 전환
        driver.switchTo().frame(driver.findElement(By.id("iframe")));

        try {
            Select selectOptions = new Select(driver.findElement(By.className("selectpicker")));
            System.out.println("기본 셀렉트옵션 : " + selectOptions.getFirstSelectedOption().getText());

            selectOptions.selectByVisibleText(language);  // 언어 정보 선택 --이까지 실행됨
            System.out.println("변경 셀렉트옵션 : " + driver.findElement(By.className("filter-option")));  // 굿





            // 엘리먼트가 바뀔 때까지 대기 (최대 10초 대기)
//            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));   오류
//            wait.until(ExpectedConditions.stalenessOf(selectOptions.getFirstSelectedOption()));   오류

            // 엘리먼트가 바뀔 때까지 대기 (최대 10초 대기)
//            wait.until(ExpectedConditions.stalenessOf(selectOptions.getFirstSelectedOption()));
//
//            Select jsOptions = new Select(driver.findElement(By.className("selectpicker")));
//
//            System.out.println("변경 셀렉트옵션 : " + jsOptions.getFirstSelectedOption().getText());  // 굿
//
//            driver.findElement(By.className("CodeMirror-line")).findElement(By.tagName("span")).click();    // 코드 실행창 기존 내용 지우기
//            driver.findElement(By.className("CodeMirror-line")).findElement(By.tagName("span")).sendKeys(Keys.CONTROL + "A");
//            driver.findElement(By.className("CodeMirror-line")).findElement(By.tagName("span")).sendKeys(code);
//            System.out.println("코드 : " + driver.findElement(By.className("CodeMirror-line")).findElement(By.tagName("span")));  // 코드 내용 입력






//            List<WebElement> tags = driver.findElements(By.className("CodeMirror-line"));   // 가져올때는 이대로 가져와서 사용해도 될듯
//            for(int i = 0; i < tags.size(); i++) {
//                System.out.println("코드 : " + tags.get(i).getText());
//            }

//                String outputGuide = driver.findElement(By.id("output")).findElement(By.className("guide")).getText();
//                System.out.println("아웃풋 : " + driver.findElement(By.id("output")).findElement(By.className("guide")).getText());   // 굿


            WebElement output = driver.findElement(By.id("output"));
            System.out.println("아웃풋 부모 : " + output);

            driver.findElement(By.id("run")).click();   // 코드 실행

//                System.out.println("Test : " + output.findElement(By.className("console-wall-time")).getText().length());

            if (output.findElement(By.className("console-wall-time")).getText().length() == 17) {
                String outputGuide = driver.findElement(By.id("output")).findElement(By.className("guide")).getText();
                System.out.println("가이드 : " + driver.findElement(By.id("output")).findElement(By.className("guide")).getText());   // 굿
            } else {
                String pre = driver.findElement(By.id("output")).findElement(By.className("console-content")).getText();
                System.out.println("아웃풋 : " + pre);
            }

//                // 대기 시간 설정 (값이 변할 때마다 반복 주기)
//                wait.until(ExpectedConditions.stalenessOf(outputGuide));
//            Thread.sleep(5000); // 5초 대기 (사실상 뷰가 생기며 필요 없어짐)

            // 페이지를 새로고침하여 값이 변경되었는지 확인
//                driver.navigate().refresh();
        }
        catch (StaleElementReferenceException e) {
            // "Stale Element Reference" 예외 처리
            System.err.println("Stale Element Reference 예외 발생: " + e.getMessage());
            e.printStackTrace();
        }
//        finally {
//            driver.quit();
//        }
    }

}
