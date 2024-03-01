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


data_format = [
    'Country',
    'GDP',
    'Population',
    'GDP Growth',
    'Interest Rate',
    'Inflation Rate',
    'Unemployment Rate',
    'Current Acount to GDP',
    'Government Debt to GDP',
]
URL = 'https://www.tradingview.com/markets/world-economy/countries/'
path_to_file = Path("./trading_view_world_economy/data/entire_world.csv")


def scrape_url(url):
    data = [data_format, ]
    driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()))
    driver.get(url)
    driver.implicitly_wait(10)
    
    
    econ_data_by_countrys = driver.find_elements(by=By.CSS_SELECTOR, value="div.row-efijKOjz")
    for econ_data_by_country in econ_data_by_countrys:
        columns = econ_data_by_country.find_elements(by=By.CSS_SELECTOR, value='a')
        country = columns[0].text
        gdp = columns[1].text
        population = columns[2].text
        gdp_growth = columns[3].text
        interest_rate = columns[4].text
        inflation_rate = columns[5].text
        unemployment_rate = columns[6].text
        current_account_to_gdp = columns[7].text
        government_debt_to_gdp = columns[8].text
        
        data.append([country, gdp, population, gdp_growth, interest_rate, inflation_rate, unemployment_rate, current_account_to_gdp, government_debt_to_gdp,])
        
    driver.quit()
    return data
        
    
    
if __name__ == "__main__":
    returned_data = scrape_url(url=URL)
    
    with open(file=path_to_file, mode="w", encoding="UTF-8", newline="\n") as file:
        writer = csv.writer(file)
        writer.writerows(returned_data)
    