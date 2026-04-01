from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium_stealth import stealth
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pandas as pd
from datetime import datetime
import time

date=datetime.now().strftime("%Y%m%d")
url = f"https://news.mingpao.com/ins/%E6%B8%AF%E8%81%9E/section/{date}/s00001"
print(url)

options = Options()
options.add_argument("--headless")
options.add_argument("--no-sandbox")
options.add_argument("--disable-blink-features=AutomationControlled")
options.add_argument("--disable-dev-shm-usage")
options.add_argument("--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36")

driver=webdriver.Chrome(options=options)
stealth(driver,
        languages=["zh-TW", "zh-HK", "en-US"],
        vendor="Google Inc.",
        platform="Win32",
        webgl_vendor="Intel Inc.",
        renderer="Intel Iris OpenGL Engine",
        fix_hairline=True)

driver.get(url)
wait = WebDriverWait(driver,12)
all_nlist = []

while len(all_nlist)<=80:
    try:
        load_more = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "button.loadmore.txt2")))
        driver.execute_script("arguments[0].click();", load_more)
        time.sleep(3) 
        print(f"Loaded more... Total: {len(all_nlist)}")
    except:
        print("No more load more button")
        break

    news_items = driver.find_elements(By.CSS_SELECTOR, ".contentwrapper")
    for news in news_items[len(all_nlist):]: 
        try:
            title_links = news.find_elements(By.CSS_SELECTOR, "h2 a")
            for link_elem in title_links:
                title = link_elem.text.strip()
                if title and len(title)>5: 
                    link = link_elem.get_attribute("href")
                    if link not in [item['link'] for item in all_nlist]:
                        all_nlist.append({"Title": title, "link": link})
                    break
        except AttributeError:
            print("Skipping a news")
            continue
# print(all_nlist[:5])
driver.quit()
print(f"Done, total length:{len(all_nlist)}")
df = pd.DataFrame(all_nlist)
date_str = datetime.now().strftime("%Y%m%d")
df.to_csv(f"news_list_{date_str}.csv")