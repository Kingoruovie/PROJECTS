from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


import time
import csv
import sys
from pathlib import Path
import pprint


URL = "https://www.imdb.com/chart/tvmeter/?ref_=chttentp_ql_5"
CHROME_OPTIONS = Options()
CHROME_OPTIONS.add_argument("--headless")

data_format = [
    'title',
    'year',
    'duration',
    'parental_guidiance',
    'rating',
    'description',
    'director',
    'stars',
    'votes',
]


def scrape_url():
    browser = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()))
    browser.get(URL)
    browser.maximize_window()

    wait = WebDriverWait(browser, 10)
    detail_btn = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "button#list-view-option-detailed")))
    detail_btn.click()

    browser.implicitly_wait(10)
    movies = browser.find_elements(by=By.CSS_SELECTOR, value="ul > li.ipc-metadata-list-summary-item")
    collective_data = [data_format]
    for movie in movies:
        title = movie.find_element(by=By.CSS_SELECTOR, value="div.ipc-title").text
        duration_list = movie.find_element(by=By.CSS_SELECTOR, value="div.hcJWUf.dli-title-metadata").text.split('\n')
        if len(duration_list) == 3:
            year, duration, parental_guidiance = duration_list
        elif len(duration_list) == 2:
            year, duration = duration_list
            parental_guidiance = "-"
        else:
            year = duration_list[0]
            duration = "-"
            parental_guidiance = "-"
        rating = movie.find_element(by=By.CSS_SELECTOR, value="span.ipc-rating-star").text.split('\n')[0]
        description = movie.find_element(by=By.CSS_SELECTOR, value="div.ipc-html-content-inner-div").text
        director = movie.find_element(by=By.CSS_SELECTOR, value="span.iKOjcR a.dli-director-item").text
        stars = ", ".join([star.text for star in movie.find_elements(by=By.CSS_SELECTOR, value="span.iKOjcR a.dli-cast-item")])
        try:
            votes = movie.find_element(by=By.CSS_SELECTOR, value="div.cyGaqI").text[5:]
        except:
            votes = "-"
        data = [title, year, duration, parental_guidiance, rating, description, director, stars, votes]
        collective_data.append(data)
    browser.quit()
    return collective_data


def save_date_to_file(data):
    file_path = Path('./IMDb/data/') / "most_popular_tv_shows.csv"
    with open(file_path, mode="w", encoding="utf-8", newline="\n") as file:
        writer = csv.writer(file)
        writer.writerows(data)


if __name__ == "__main__":
    returned_data = scrape_url()
    save_date_to_file(returned_data)