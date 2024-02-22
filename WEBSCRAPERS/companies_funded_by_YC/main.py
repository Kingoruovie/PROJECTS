from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException


import time
import csv
from pathlib import Path


URL = "https://www.ycombinator.com/companies"
path_to_file = Path(r"./companies_funded_by_YC/data/companies.csv")
data_format = [
    "Name",
    "Location",
    "Description",
    "Batch",
    "Industry",
    "Tags",
]


def scrape_url(url):
    data = [data_format,]
    js = "window.scrollTo(0, document.body.scrollHeight)"
    driver = webdriver.Chrome()
    driver.maximize_window()
    driver.get(url)
    driver.implicitly_wait(5)
    time.sleep(10)
    
    page_height = driver.execute_script("return document.body.scrollHeight;")
    while True:
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(10)
        new_page_height = driver.execute_script("return document.body.scrollHeight;")
        if page_height == new_page_height:
            break
        page_height = new_page_height 
        
    
    companies_detail = driver.find_elements(
        by=By.CSS_SELECTOR, 
        value="a._company_19sud_339 > div > div:nth-child(2) > div"
    )
    for company in companies_detail:
        name = company.find_element(by=By.CSS_SELECTOR, value="span._coName_19sud_454").text
        location = company.find_element(by=By.CSS_SELECTOR, value="span._coLocation_19sud_470").text
        description = company.find_element(by=By.CSS_SELECTOR, value="span._coDescription_19sud_479").text
        other_details = company.find_elements(by=By.CSS_SELECTOR, value="div._pillWrapper_19sud_33 > a")
        if len(other_details) == 3:
            batch_element, industry_element,tags_element = other_details
            batch = batch_element.text
            industry = industry_element.text
            tags = tags_element.text
        elif len(other_details) == 2:
            batch_element, industry_element = other_details
            batch = batch_element.text
            industry = industry_element.text
            tags = ""
        else:
            batch_element, = other_details
            batch = batch_element.text
            industry = ""
            tags = ""
        data.append([
            name,
            location,
            description,
            batch,
            industry,
            tags,
        ])
    
    driver.quit
    return data
    
if __name__ == "__main__":
    return_data = scrape_url(URL)    
    
    with open(file=path_to_file, mode="w", encoding="utf-8", newline="\n") as file:
        writer = csv.writer(file)
        writer.writerows(return_data)