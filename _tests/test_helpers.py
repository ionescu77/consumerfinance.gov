def click_filter_posts(test):
    test.filter_dropdown_button = test.driver.find_element_by_xpath('//button[contains(text(), "Filter posts")]')
    if test.filter_dropdown_button.get_attribute('aria-pressed') == 'false':
        test.filter_dropdown_button.click()

def coerce_category_for_dom(category):
    if category.find(' ') != -1:
        category = category.replace(' ', '+')
    elif category.find('+') != -1:
        category = category.replace('+', ' ')

    return category