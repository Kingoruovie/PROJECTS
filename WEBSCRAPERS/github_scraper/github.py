from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options


import time
import sys
import csv
import pprint





chrome_options = Options()
chrome_options.add_argument("--headless")

url = "https://github.com/topics"



def get_all_topics_on_github():
    driver = webdriver.Chrome()
    driver.get(url=url)
    driver.implicitly_wait(5)

    # Needed this to load more topics using the load more button
    scroll_count = 6
    for _ in range(scroll_count):
        driver.find_element(
            by=By.TAG_NAME, 
            value="body"
        ).send_keys(Keys.END)
        driver.find_element(
            by=By.CSS_SELECTOR, 
            value="button.ajax-pagination-btn"
        ).click()
        time.sleep(3)

    
    uncleaned_links = driver.find_elements(
        by=By.CSS_SELECTOR, 
        value="a.no-underline.flex-1.d-flex.flex-column"
    )
    
    cleaned_links = [
        uncleaned_link.get_attribute("href") \
        for uncleaned_link in uncleaned_links
    ]

    driver.quit()
    return cleaned_links


def write_topics_to_a_file(links: list) -> None:
    file_path = "./github_scraper/topics_link.txt"
    with open(file=file_path, mode="wt") as file:
        file.write("Topics Link")
        for link in links:
            file.write(f"\n{link}")


def get_repo_detail_by_link(link):

    data_format = [
        [
            "Link",
            "Owner",
            "Name",
            "Stars",
            "Description",
            "Major Language",
            "Tags"
        ]
    ]

    
    driver = webdriver.Chrome(options=chrome_options)
    driver.get(url=link)
    driver.implicitly_wait(5)
    
    load_more_exists = True
    
    while load_more_exists:
        driver.find_element(
            by=By.TAG_NAME, 
            value="body"
        ).send_keys(Keys.END)
        time.sleep(1)
        btn_list = driver.find_elements(by=By.CSS_SELECTOR, value="button.ajax-pagination-btn")
        if btn_list:
            btn_list[0].click()
        else:
            load_more_exists = False
        time.sleep(2)


    driver.find_element(
            by=By.TAG_NAME, 
            value="body"
        ).send_keys(Keys.HOME)

    time.sleep(10)

    article_tags = driver.find_elements(by=By.TAG_NAME, value="article")
    for article_tag in article_tags:
        repo_link = article_tag.find_element(
            by=By.CSS_SELECTOR, 
            value="a.Link.text-bold.wb-break-word"
        ).get_attribute("href")
        repo_owner, repo_name = article_tag.find_element(
            by=By.TAG_NAME, 
            value="h3"
        ).text.split(" / ")
        repo_stars = article_tag.find_element(
            by=By.CSS_SELECTOR, 
            value="span#repo-stars-counter-star"
        ).text
        try:
            repo_description = article_tag.find_element(
                by=By.CSS_SELECTOR, 
                value="p.color-fg-muted.mb-0"
            ).text
        except:
            repo_description = ""
        repo_tags = " ".join([a.text for a in article_tag.find_elements(
            by=By.CSS_SELECTOR, value="a.topic-tag.topic-tag-link.Link.f6.mb-2")
        ])

        try:
            repo_major_lang = article_tag.find_elements(
                by=By.CSS_SELECTOR, 
                value='ul.d-flex.f6.list-style-none.color-fg-muted li'
            )[1].text
        except IndexError:
            repo_major_lang = ""
        
        
        new_record = [
            repo_link,
            repo_owner, 
            repo_name,
            repo_stars,
            repo_description,
            repo_major_lang,
            repo_tags
        ]

        data_format.append(new_record)
    
    driver.quit()
    return data_format


def write_repos_to_file_by_topic(topic, data):
    file_path = f"./github_scraper/{topic}.csv"
    with open(file=file_path, mode="w") as file:
        writer = csv.writer(file)
        writer.writerows(data)



if __name__ == "__main__":
    
    # links = get_all_topics_on_github()
    # write_topics_to_a_file(links=links)
    with open("./github_scraper/topics_link.txt") as file:
        links = file.readlines()[1:]
        github_repo_links = [link.strip() for link in links]
    
    count = 0
    percentage_done = 0
    print(f"{percentage_done}%", end="",flush=True)
    for link in github_repo_links:
        count += 1

        data = get_repo_detail_by_link(link)
        topic = link.split("/")[-1]
        write_repos_to_file_by_topic(topic=topic, data=data)

        percentage_done = round((count / len(github_repo_links)) * 100, 3)
        sys.stdout.write("\r")
        sys.stdout.write(" " * 5)
        sys.stdout.write("\r")
        print(f"{percentage_done}%", end="" ,flush=True)
