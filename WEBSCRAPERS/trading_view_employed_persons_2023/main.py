from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.common.exceptions import NoSuchElementException

import csv
from pathlib import Path
import time


URL = "https://www.tradingview.com/markets/world-economy/indicators/employed-persons/?market=Worldwide"
path_to_file = Path("./trading_view_employed_persons_2023/data/employed_persons.csv")
data_format = [
    "Country",
    "Symbol",
    "Last",
    "Previous",
    "Reference",
    "Unit",
    "Frequency",
]


def scrape_url(url):
    data = [data_format, ]
    driver = webdriver.Chrome()
    driver.get(url)
    time.sleep(10)
    
    rows = driver.find_elements(
        by=By.CSS_SELECTOR, 
        value="div.wrap-gfVnbvfd > div.listItem-gfVnbvfd > div.wrap-kn8jy56Z"
    )
    for row in rows:
        try:
            columns = row.find_elements(by=By.CSS_SELECTOR, value="div.cell-kn8jy56Z")
            symbol, country = columns[0].text.split("\n")
            last = "".join(columns[1].text.split("\n"))
            previous = columns[2].text
            reference = columns[3].text
            unit = columns[4].text
            frequency = columns[5].text
            
            data.append([
                country,
                symbol, 
                last, 
                previous,
                reference,
                unit,
                frequency,
            ])
        except:
            continue
        
    driver.quit()
    return data
    

if __name__ == "__main__":
    returned_data = scrape_url(url=URL)
    
    with open(file=path_to_file, mode="w", encoding="UTF-8", newline="\n")  as file:
        writer = csv.writer(file)
        writer.writerows(returned_data)