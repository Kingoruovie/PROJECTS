from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException

from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager


import time
import csv
from pathlib import Path


data_format = [
    "Name",
    "Net Worth",
    "Age",
    "Country/Territory",
    "Source",
    "Industry"
]
data = [data_format,]
URL = "https://www.forbes.com/billionaires/"
path_to_file = Path(r'./forbes_billionaires_list_2023/data/billionaires_list.csv')


def scrape_url(url):
    global data
    driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()))
    driver.maximize_window()
    driver.get(url)
    # driver.implicitly_wait(10)
    time.sleep(10)
    
    driver.execute_script("window.stop();")
    next_btn = driver.find_elements(by=By.CSS_SELECTOR, value="button.Pagination_paginationBtn__UIBE-")[1]
    next_btn.click()
        
    time.sleep(20)
    driver.quit()
    
    
if __name__ == "__main__":
    scrape_url(url=URL)