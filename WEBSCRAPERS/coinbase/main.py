from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.common.exceptions import NoSuchElementException


import time
from pathlib import Path
import csv

data_format = [
    "name",
    "price",
    "change",
    "market cap",
]

data = []

path_to_file = Path(r'./coinbase/data/crypto_2023_2024_price.csv')
URL = "https://www.coinbase.com/explore?resolution=year"
TOTAL_PAGE = 300
page = 0

def generate_url():
    global page
    page += 1
    return f"{URL}&page={page}"


def scrape_url(url):
    driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()))
    driver.get(url)
    driver.implicitly_wait(10)

    global data 

    table_rows = driver.find_elements(by=By.CSS_SELECTOR, value="tbody.Listing__TableBodyWrapper-sc-1ktidpo-0.qCpBF > tr")
    for row in table_rows:
        row_data = row.find_elements(by=By.CSS_SELECTOR, value="td.cds-tableCell-t1jg7jzg")
        crypto_name = "-".join(row_data[0].text.split("\n")[1:])
        crypto_price = row_data[1].text
        crypto_change = row_data[3].text.split("\n")[1] if len(row_data[3].text.split("\n")) == 2 else row_data[3].text.split("\n")[0]
        if crypto_change != "":
            trial = row_data[3].find_element(by=By.CSS_SELECTOR, value="span.cds-iconStyles-iogjozt").get_attribute("data-icon-name")
            if trial == "diagonalUpArrow":
                crypto_change = f"+{crypto_change}"
            if trial == "diagonalDownArrow":
                crypto_change = f"-{crypto_change}"
        crypto_market_cap = row_data[4].text

        data.append([crypto_name, crypto_price, crypto_change, crypto_market_cap])

    driver.quit()
    


if __name__ == "__main__":
    while page + 1 <= TOTAL_PAGE:
        try: 
            url = generate_url()
            scrape_url(url)
            print("Page", page , "Done")
        except:
            continue

        if (page) % 30 == 0:
            with open(path_to_file,mode="a", encoding="utf-8", newline="\n") as file:
                writer = csv.writer(file)
                writer.writerows(data)
            data = []
    
    
