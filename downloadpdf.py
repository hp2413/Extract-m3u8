import pdfkit

def save_webpage_as_pdf(url, output_file):
    try:
        pdfkit.from_url(url, output_file)
        print(f"PDF saved successfully: {output_file}")
    except Exception as e:
        print(f"Error saving PDF: {e}")

if __name__ == "__main__":
    webpage_url = "https://app.100xdevs.com/pdf/157"
    pdf_file_name = "Week_1.pdf"
    save_webpage_as_pdf(webpage_url, pdf_file_name)

# import pdfkit
# import re
# import requests
# from bs4 import BeautifulSoup

# def get_week_number(title):
#     # Use regular expression to extract the week number from the title
#     match = re.search(r"Week\s*(\d+)", title, re.IGNORECASE)
#     if match:
#         return match.group(1)
#     else:
#         return 1

# def get_page_title(html_content):
#     try:
#         soup = BeautifulSoup(html_content, 'html.parser')
#         title_tag = soup.title
#         if title_tag:
#             return title_tag.string.strip()
#         else:
#             return None
#     except Exception as e:
#         print(f"Error fetching page title: {e}")
#         return None

# def url_to_pdf(url, output_path):
#     try:
#         options = {'quiet': ''}
#         pdfkit.from_url(url, output_path, options=options, configuration=pdfkit.configuration(wkhtmltopdf='/usr/local/bin/wkhtmltopdf'))
#         print(f"PDF saved successfully at {output_path}")
#     except Exception as e:
#         print(f"Error converting URL to PDF: {e}")

# if __name__ == "__main__":
#     url = "https://app.100xdevs.com/pdf/157"
#     week_number = 1
#     # week_number = get_week_number()
#     url_to_pdf(url, output_path = f"Week_{week_number}.pdf")
