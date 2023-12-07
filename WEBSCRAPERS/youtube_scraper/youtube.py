from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options


import time 
import sys
import csv


chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--mute-audio")

data_format = [
    [
    "Title",
    "Producer",
    "Subscribers",
    "Information",
    "Total Comment",
    "Some Comments",
    ]
]
query = '+'.join((input("Please input the topic you interested in: ")).split(' '))


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


def get_videos_link(query):
    url = "https://www.youtube.com/results?search_query=" + query
    driver = webdriver.Chrome(options=chrome_options)
    
    driver.get(url=url)
    driver.implicitly_wait(5)
    time.sleep(10)

    scroll_count_first_phase = 30
    for _ in range(scroll_count_first_phase):
        driver.find_element(
			by=By.TAG_NAME, 
			value='body'
		).send_keys(Keys.END)
        time.sleep(2)

    time.sleep(5)

    driver.find_element(
			by=By.TAG_NAME, 
			value='body'
		).send_keys(Keys.HOME)

    uncleaned_links = driver.find_elements(by=By.ID, value="video-title")
    
    video_urls = [
        element.get_attribute("href") \
            for element in uncleaned_links \
            if element.get_attribute("href")
    ]

    # This is to get the height of the page after the every image generation has been don
    scroll_height = driver.execute_script(
        "return Math.max( Number(document.body.scrollHeight), \
        Number(document.body.offsetHeight), \
        Number(document.documentElement.clientHeight), \
        Number(document.documentElement.scrollHeight), \
        Number(document.documentElement.offsetHeight));"
    )
			
	# While this is to get the viewport height			
    page_height_in_view = driver.execute_script(
        "return document.documentElement.clientHeight;"     
    )

    gradual_scroll(driver, scroll_height, page_height_in_view)
    driver.quit()
    return video_urls


def scrape_watch(url):
    global data_format
    driver = webdriver.Chrome(chrome_options)
    driver.get(url)
    driver.implicitly_wait(2)

    scroll_count_first_phase = 5
    for _ in range(scroll_count_first_phase):
        driver.find_element(
			by=By.TAG_NAME, 
			value='body'
		).send_keys(Keys.END)
        time.sleep(2)

    time.sleep(5)

    driver.find_element(
			by=By.TAG_NAME, 
			value='body'
		).send_keys(Keys.HOME)
    
    scroll_height = driver.execute_script(
        "return Math.max( Number(document.body.scrollHeight), \
        Number(document.body.offsetHeight), \
        Number(document.documentElement.clientHeight), \
        Number(document.documentElement.scrollHeight), \
        Number(document.documentElement.offsetHeight));"
    )
	# While this is to get the viewport height			
    page_height_in_view = driver.execute_script(
        "return document.documentElement.clientHeight;"
    )
    gradual_scroll(driver, scroll_height, page_height_in_view)

    try:
        video_title = driver.find_element(by=By.CSS_SELECTOR, value="div#title h1").text
        video_producer = driver.find_element(by=By.CSS_SELECTOR, value="div#upload-info a").text
        producer_sub_count = driver.find_element(by=By.ID, value="owner-sub-count").text
        video_info = driver.find_element(by=By.CSS_SELECTOR, value="div#info-container #info").text
        video_comments_count = driver.find_element(by=By.CSS_SELECTOR, value="div#title h2").text
        some_comments = [
            comment_element.text \
            for comment_element in \
            driver.find_elements(
                by=By.CSS_SELECTOR, 
                value="div#comment-content"
            )
        ]

        particular_video_detail = [
            video_title,
            video_producer,
            producer_sub_count,
            video_info,
            video_comments_count,
            some_comments 
        ]

        data_format.append(particular_video_detail)
    except:
        pass
    driver.quit()


def get_the_comments_and_views(list_of_urls):
    count = 0
    percentage_done = 0
    print(f"{percentage_done}%", end="" ,flush=True)
    for url in list_of_urls:
        count += 1
        
        if "shorts" in url:
            continue
        else:
            scrape_watch(url)
            percentage_done = round((count / len(list_of_urls)) * 100, 3)
            sys.stdout.write("\r")
            sys.stdout.write(" " * 5)
            sys.stdout.write("\r")
            print(f"{percentage_done}%", end="" ,flush=True)
            


if __name__ == "__main__":
    list_of_video_links = get_videos_link(query)
    get_the_comments_and_views(list_of_video_links[:130])

    
    name_of_file = "./youtube_scraper/"+ "_".join(query.split("+")) + ".csv"
    with open(name_of_file, mode="w", newline="") as file:
        writer = csv.writer(file)
        writer.writerows(data_format)

    print(f"Data have been saved to '{name_of_file}'.")