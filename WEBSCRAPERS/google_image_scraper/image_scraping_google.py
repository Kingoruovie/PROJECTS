from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
import os

from downloading_images import check_the_url_to_determine_route



query = input("Pictures you want to get from the web, just the name:  ")



folder_name = query.upper()

# Check if the folder doesn't already exist
if not os.path.exists(folder_name):
    os.mkdir(folder_name)
    print(f"Folder '{folder_name}' created successfully.")
else:
    print(f"Folder '{folder_name}' already exists.")



def gradual_scroll(driver, scroll_height, page_height_in_view):
	"""
	Need to implement this to make sure that I have as many pictures load as possible.
	=====================================================================
	--driver: This is the driver created for the automation
	--scroll_height: Represents the full page height when all images has been source through
	--page_height_view: This is get the browser view height so we can scroll continuously with this factor.
	"""
	
	# This is the scrolling implementation.
	page_current_height = 0
	while page_current_height < scroll_height:
    	# Scroll a small distance (you can adjust the pixel value)
		driver.execute_script(f"window.scrollBy(0, {page_height_in_view});")
		page_current_height += page_height_in_view
		time.sleep(2)
		
	return



def test_image_url_scraping(query):
	"""
	This is the main function actually that implements the automation.
	================================================================
	--query: As the name implies, it is what plan on scraping
	"""
	
	# Initialisation of the webdriver and navigating to the image tab of the query given
	driver = webdriver.Chrome()
	
	driver.implicitly_wait(1)
	
	driver.get("https://google.com")
	
	
	search_area = driver.find_element(by=By.NAME, value="q")
	search_area.send_keys(query)
	
	search_area.send_keys(Keys.RETURN)
	
	driver.implicitly_wait(5)
	
	driver.find_element(by=By.XPATH, value='//*[@id="bqHHPb"]/div/div/div[1]/a[1]').click()
	
	driver.implicitly_wait(5)
	
	# This is to implement the auto generation of image
	
	# first phase before the show more result
	scroll_count_first_phase = 5
	for _ in range(scroll_count_first_phase):
		driver.find_element(
			by=By.TAG_NAME, 
			value='body'
		).send_keys(Keys.END)
		time.sleep(2)
	
	# Second phase after the show more result
	show_more_btn = driver.find_element(
		by=By.CLASS_NAME, 
		value="LZ4I"
	).click()
	
	scroll_count_second_phase = 3
	for _ in range(scroll_count_first_phase):
		driver.find_element(
			by=By.TAG_NAME, 
			value='body'
		).send_keys(Keys.END)
		time.sleep(2)
	
	
	# Just so we can allow everything to load, I guess
	time.sleep(2)
	
	# Here, we move back to the beginning of the page
	driver.find_element(
			by=By.TAG_NAME, 
			value='body'
		).send_keys(Keys.HOME)
	
	# This is to get the height of the page after the every image generation has been don
	scroll_height = driver.execute_script("return Math.max( Number(document.body.scrollHeight), Number(document.body.offsetHeight), Number(document.documentElement.clientHeight), Number(document.documentElement.scrollHeight), Number(document.documentElement.offsetHeight));")
			
	# While this is to get the viewport height			
	page_height_in_view = driver.execute_script("return document.documentElement.clientHeight;")
	
	
	gradual_scroll(driver, scroll_height, page_height_in_view)
	
	# Lastly we get the URL of all images loaded here
	uncleaned_links = driver.find_elements(
		by=By.CSS_SELECTOR, 
		value=".rg_i.Q4LuWd"
	)
	
	# And cleaned them, that is just get the src attribute
	image_urls = [element.get_attribute("src")\
	 for element in uncleaned_links\
	  if element.get_attribute("src")
	 ]
	
	
	return image_urls
	driver.quit()
	
if __name__ == "__main__":
	image_urls = test_image_url_scraping(query)
	for position, url in enumerate(image_urls):
		check_the_url_to_determine_route(query, position, url)
