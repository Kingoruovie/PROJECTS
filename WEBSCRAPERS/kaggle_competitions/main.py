from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains


from pathlib import Path
import time
import sys
import csv
import pprint


base_url: str = "https://www.kaggle.com/competitions"
chrome_options = Options()
chrome_options.add_argument("--headless")


def main():
    driver = webdriver.Chrome()
    driver.maximize_window()
    driver.get(base_url)
    driver.implicitly_wait(5)
    
    all_comp_btn = driver.find_element(
        by=By.XPATH, 
        value='//*[@id="site-content"]/div[2]/div/div[4]/div/div[2]/div/div[1]/button[1]'
    )
    all_comp_btn.click()
    time.sleep(5)
    
    next_btn = driver.find_element(
        by=By.XPATH, 
        value='//*[@id="site-content"]/div[2]/div/div[5]/div/div/div/div[2]/i[2]'
    )
    action = ActionChains(driver)
    action.move_to_element(next_btn)
    action.click(next_btn)
    action.perform()
    # def next_page():
        
    
    # next_page()
    
    time.sleep(10)
    driver.quit()
    
    
if __name__ == "__main__":
    main()