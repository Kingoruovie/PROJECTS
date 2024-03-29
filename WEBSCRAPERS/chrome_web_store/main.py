from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains


import time
import csv
import pprint
from pathlib import Path


chrome_options = Options()
chrome_options.add_argument('--headless')
base_url = 'https://chromewebstore.google.com/category/extensions'
extension_cat = {
    'productivity': [
        'communication',
        'developer',
        'education',
        'tools',
        'workflow',
    ],
    'lifestyle': [
        'art',
        'entertainment',
        'games',
        'household',
        'fun',
        'news',
        'shopping',
        'social',
        'travel',
        'well_being',
    ]
}
home_path = Path('./chrome_web_store/data/')


def save_file(data, file_name):
    with open(file=home_path / Path(file_name + '.csv'), mode='w', encoding='UTF-8', newline='\n') as file:
        csv_writer = csv.writer(file)
        csv_writer.writerows(data)
        print(file_name, 'Done')


def main():
    for key, values in extension_cat.items():
        for value in values:
            url = f"{base_url}/{key}/{value}"
            data = [
                [
                    'Name',
                    'Rating',
                    'People who Rate',
                    'description',
                ]
            ]
            
            driver = webdriver.Chrome(options=chrome_options)
            driver.get(url)
            driver.implicitly_wait(5)
            
            action = ActionChains(driver=driver)
            while True:
                try:
                    time.sleep(2)
                    load_more_btn = driver.find_element(
                        by=By.CSS_SELECTOR, 
                        value='button.mUIrbf-LgbsSe.mUIrbf-LgbsSe-OWXEXe-dgl2Hf.Vs7jVd'
                    )
                    action.move_to_element(load_more_btn)
                    action.click()
                    action.perform()
                except:
                    break
            
            extension_cards = driver.find_elements(by=By.CSS_SELECTOR, value='div.TS4QDe')
            for extension_card in extension_cards:
                name = extension_card.find_element(by=By.CSS_SELECTOR, value='p.GzKZcb').text
                rating_value, rating_number = extension_card.find_element(by=By.CSS_SELECTOR, value='span.GvZmud').text.split()
                description = extension_card.find_element(by=By.CSS_SELECTOR, value='p.Uufqmb').text
                
                data.append([
                    name,
                    rating_value,
                    rating_number,
                    description,
                ])
                
            save_file(data, value)
            driver.quit()
                
            
            


if __name__ == "__main__":
    main()