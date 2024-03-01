from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.common.exceptions import NoSuchElementException


import csv
from pathlib import Path


URL = "https://www.tradingview.com/markets/world-stocks/worlds-largest-employers/"
path_to_file = Path("./trading_view_worlds_largest_employers_overview/data/worlds_largest_employers_overview.csv")
data_format = [
    'Symbol',
    'Name',
    'Country',
    'Exchange',
    'Employees',
    'Price', 
    'Change',
    'Volume',
    'Relative volume',
    'Market Cap',
    'Price to Earning ratio',
    'EPS diluted',
    'EPS dilutes growth',
    'Dividend yield',
    'sector',
]


def scrape_url(url):
    data = [data_format, ]
    driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()))
    driver.get(url)
    driver.implicitly_wait(10)
    
    rows = driver.find_elements(by=By.CSS_SELECTOR, value="tbody > tr.row-RdUXZpkv")
    for row in rows:
        columns = row.find_elements(by=By.TAG_NAME, value="td")
        symbol = columns[0].find_element(by=By.TAG_NAME, value="a").text
        name = columns[0].find_element(by=By.TAG_NAME, value="sup").text
        country = columns[1].find_element(by=By.TAG_NAME, value="img").get_attribute("src").split("/")[-1][:-4]
        exchange = columns[2].text
        employees = columns[3].text
        price = columns[4].text
        change = columns[5].text
        volume = columns[6].text
        relative_volume = columns[7].text
        market_cap = columns[8].text
        P_to_E = columns[9].text
        EPS_diluted = columns[10].text
        EPS_diluted_growth = columns[11].text
        dividend_yield = columns[12].text
        sector = columns[13].text
        
        data.append([
            symbol,
            name,
            country,
            exchange,
            employees,
            price,
            change,
            volume,
            relative_volume,
            market_cap,
            P_to_E,
            EPS_diluted, 
            EPS_diluted_growth, 
            dividend_yield, 
            sector, 
        ])      
         
        
    driver.quit()
    return data
    
    
    
if __name__ == "__main__":
    returned_data = scrape_url(url=URL)
    
    with open(file=path_to_file, mode="w", encoding="UTF-8", newline="\n") as file:
        writer = csv.writer(file)
        writer.writerows(returned_data)