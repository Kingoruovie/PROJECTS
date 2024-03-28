from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options


import csv
import pprint
import time
from pathlib import Path


chrome_options = Options()
chrome_options.add_argument('--headless')
base_url = "https://marketplace.visualstudio.com/search?target=VSCode&category=All%20categories&sortBy=Installs"
file_path = './vscode_market_place/data/data.csv'


def save_to_file(data):
    with open(file=file_path, mode="w", encoding="UTF-8", newline="\n") as file:
        csv_writer = csv.writer(file)
        csv_writer.writerows(data)


def main():
    data = [
        [
            "name",
            "installs",
            "publisher",
            "details",
            "rating"
        ],
    ]
    driver = webdriver.Chrome(options=chrome_options)
    driver.get(base_url)
    driver.implicitly_wait(5)
    
    page_height = driver.execute_script('return document.body.scrollHeight;')
    n=0
    while True:
        driver.execute_script('window.scrollTo(0, document.body.scrollHeight);')
        time.sleep(5)
        new_page_height = driver.execute_script("return document.body.scrollHeight;")
        if page_height == new_page_height or n == 100:
            break
        page_height = new_page_height
        n += 1
        
    
    extension_cards = driver.find_elements(by=By.CSS_SELECTOR, value='div.gallery-item-card')
    for extension_card in extension_cards:
        name = extension_card.find_element(by=By.CSS_SELECTOR, value='div.name span.item-title').text
        installs = extension_card.find_element(by=By.CSS_SELECTOR, value='div.core-info-second-row span.installs').text
        publisher = extension_card.find_element(by=By.CSS_SELECTOR, value='div.core-info-second-row div.publisher').text
        details = extension_card.find_element(by=By.CSS_SELECTOR, value='.details .description').text
        rating = extension_card.find_element(by=By.CSS_SELECTOR, value=".stats-and-offer .rating-and-price .rating").get_attribute("title")
        
        data.append([
            name,
            installs,
            publisher,
            details,
            rating,
        ])
        
        save_to_file(data)
    driver.quit()
    

if __name__ == "__main__":
    main()
    print("Done")