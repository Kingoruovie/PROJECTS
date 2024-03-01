from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By


import time
import csv
from pathlib import Path



MOST_ACTIVE_URL = "https://finance.yahoo.com/most-active/?count=100&offset=0"
URL_BASE = "https://finance.yahoo.com/quote/"
URL_OTHERS = "/history?period1=345427200&period2=1709251200&interval=1wk&filter=history&frequency=1wk&includeAdjustedClose=true"

path_to_file = Path(r"./stock_historical_data/data/")
data_format = [
    "Date",
    "Open",
    "High",
    "Low",
    "Close",
    "Adjusted Close",
    "Volume",
]

chrome_options = Options()
# chrome_options.add_argument("--headless")
chrome_options.add_argument("--disable-blink-features=AutomationControlled")


def scrape_stock_name(url):
    driver = webdriver.Chrome(options=chrome_options)
    driver.get(url)
    driver.implicitly_wait(10)
    time.sleep(5)
    
    symbols = driver.find_elements(by=By.CSS_SELECTOR, value='table tbody tr.simpTblRow > td:nth-child(1) a')
    names = driver.find_elements(by=By.CSS_SELECTOR, value='table tbody tr.simpTblRow > td:nth-child(2)')
    
    with open(file=path_to_file / "stock_name.txt", mode="w+", encoding="UTF-8", newline="\n") as file:
        for symbol, name in zip(symbols, names):
            file.write(symbol.text.strip() + "==" + name.text.strip() + "\n")
    
    driver.quit()
    
    
def scrape_historical_price(stock):
    data = [
        data_format,
    ]

    driver = webdriver.Chrome(options=chrome_options)
    driver.maximize_window()
    driver.get(URL_BASE + stock + URL_OTHERS)
    driver.implicitly_wait(10)
    time.sleep(5)
    
    table_height = driver.execute_script("return document.querySelector('table[data-test=\"historical-prices\"]').scrollHeight;")
    while True:
        driver.execute_script("window.scrollTo(0, document.querySelector('table[data-test=\"historical-prices\"]').scrollHeight);")
        time.sleep(10)
        new_page_height = driver.execute_script("return document.querySelector('table[data-test=\"historical-prices\"]').scrollHeight;")
        if table_height == new_page_height:
            break
        table_height = new_page_height


    price_details = driver.find_elements(by=By.CSS_SELECTOR, value='table[data-test="historical-prices"] tbody tr.BdT')
    for price_detail in price_details:
        data_columns = price_detail.find_elements(by=By.CSS_SELECTOR, value="td")
        if len(data_columns) > 2:
            date = data_columns[0].text
            open_price = data_columns[1].text
            high_price = data_columns[2].text
            low_price = data_columns[3].text
            close_price = data_columns[4].text
            adjusted_close = data_columns[5].text
            volume = data_columns[6].text
        else:
            date = data_columns[0].text
            open_price = data_columns[1].text
            high_price = low_price = close_price = adjusted_close = volume = "-"
            
        data.append([
            date,
            open_price,
            high_price,
            low_price,
            close_price,
            adjusted_close,
            volume,    
        ])    
    driver.quit()
    return data
    
    
if __name__ == "__main__":
    # scrape_stock_name(MOST_ACTIVE_URL)

    with open(file="./stock_historical_data/data/stock_name.txt", mode="r") as file:
        stocks = file.readlines()
        for count, line in zip(range(23, 101), stocks[22:]):
            stock, company = line.strip().split("==")

            if count == 1 or stock == "META":
                continue

            while "." in company or "," in company:
                company = company.replace(".", "")
                company = company.replace(",", "")

            
            returnd_data = scrape_historical_price(stock=stock)
            file_name = ("_").join(company.split(" ")) + ".csv"

            with open(file=path_to_file / file_name, mode="w", encoding="UTF-8", newline="\n") as file:
                writer = csv.writer(file)
                writer.writerows(returnd_data)
            print(file_name + f" Done {count}")
            
            