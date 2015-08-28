from setuptools import setup, find_packages
import os
install_requires = []
with open(os.path.join(os.path.dirname(__file__),'requirements.txt')) as f:
    a=f.readlines()
    for b in a:
        striped = b.strip()
        if not striped.startswith('#'):
            install_requires.append(striped)

setup(
    name = "moto-moe",
    version = "0.1.2",
    packages =find_packages(),
    include_package_data = True,
    install_requires = install_requires,
    dependency_links = ['https://raw.githubusercontent.com/bung87/moto-moe/master/dependency_links.txt']
    package_data = {
        '': ['*.html', '*.css','*.js','*.map','*.png','*.gif','*.ttf','*.woff','*.woff2','*.svg','*.eot','*.ico'],
        'moto.moe': ['locales/*.js']
     },

    # metadata for upload to PyPI
    author = "bung",
    author_email = "crc32@qq.com",
    description = "Site sources for moto.moe",
    license = "MIT",
    keywords = "a pinterest like site sources",
    url = "https://github.com/bung87/moto-moe",   # project home page, if any

    # could also include long_description, download_url, classifiers, etc.
)