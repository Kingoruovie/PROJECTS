from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


import csv
from pathlib import Path



URLS_DICT = [
    {"link": "https://www.udemy.com/courses/development/", "num_pages": 625},
    {"link": "https://www.udemy.com/courses/business/", "num_pages": 625},
    {"link": "https://www.udemy.com/courses/finance-and-accounting/", "num_pages": 625},
    {"link": "https://www.udemy.com/courses/it-and-software/", "num_pages": 625},
    {"link": "https://www.udemy.com/courses/office-productivity/", "num_pages": 419},
    {"link": "https://www.udemy.com/courses/personal-development/", "num_pages": 625},
    {"link": "https://www.udemy.com/courses/design/", "num_pages": 625},
    {"link": "https://www.udemy.com/courses/marketing/", "num_pages": 625},
    {"link": "https://www.udemy.com/courses/lifestyle/", "num_pages": 625},
    {"link": "https://www.udemy.com/courses/photography-and-video/", "num_pages": 236},
    {"link": "https://www.udemy.com/courses/health-and-fitness/", "num_pages": 625},
    {"link": "https://www.udemy.com/courses/music/", "num_pages": 362},
    {"link": "https://www.udemy.com/courses/teaching-and-academics/", "num_pages": 625}
]
FILE_DIR = Path("./udemy/courses/")
CHROME_OPTIONS = Options()
CHROME_OPTIONS.add_argument("--headless=new")


data_format = [
    "Course Name",
    "Description",
    "Author",
    "Rating",
    "Reviews",
    "Time",
    "Lectures",
    "Level",
    "Bestseller",
]


def paginate_and_create_link(url, page):
    return f"{url}?p={page}"


def scrape_link(url):
    course_datas = []
    browser = webdriver.Chrome()
    browser.maximize_window()
    browser.get(url)
    browser.implicitly_wait(10)
    

    courses = browser.find_elements(by=By.CSS_SELECTOR, value='div.course-list--container--FuG0T div.course-list--card-layout-container--VUZlc')
    for course in courses:
        name = course.find_element(by=By.TAG_NAME, value="h3").text.split("\n")[0]
        description = course.find_element(by=By.TAG_NAME, value="p").text
        instructor = course.find_element(by=By.CSS_SELECTOR, value="div.ud-text-xs").text.split("\n")[1]
        ratings = course.find_element(by=By.CSS_SELECTOR, value="div.course-card-ratings-module--row--1EHHW").text.split("\n")
        rating, review = ratings[1], ratings[2]
        details = course.find_element(by=By.CSS_SELECTOR, value="div.course-card-details-module--row--3sv2A").text.split("\n")
        time = details[0]
        lectures = details[1]
        level = details[2]
        bestseller = True if course.find_element(by=By.CSS_SELECTOR, value="div.course-card-module--badges-container--2ENVp").text.strip() else False

        course_data = [name, description, instructor, rating, review, time, lectures, level, bestseller]
        course_datas.append(course_data)
    
    browser.quit()
    return course_datas



if __name__ == "__main__":
    for url_dict in URLS_DICT:
        base_link = url_dict["link"]
        num_pages = url_dict["num_pages"]
        name_file = base_link.split("/")[-2] + ".csv"
        data = [data_format,]
        for count in range(1, 101):
            try:
                url = paginate_and_create_link(base_link, count)
                returned_data = scrape_link(url)
                data.extend(returned_data)
            except:
                continue
        with open(file=FILE_DIR / name_file, mode="w", encoding="utf-8", newline="\n") as file:
            writer = csv.writer(file)
            writer.writerows(data)
        print(f"Done {name_file}")
