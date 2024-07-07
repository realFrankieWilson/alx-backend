#!/usr/bin/env python3
"""
`Module 2-hypermedia_pagination`
Provides a function `index_range()` that takes two
two integers arguments.
"""

import csv
import math
from typing import List


def index_range(page, page_size):
    """
    A helper function that returns a tuple of size two
    containing a start index and and end index
    Args:
    """
    start_index = (page - 1) * page_size
    end_index = start_index + page_size
    return (start_index, end_index)


class Server:
    """Server class to paginate a database of popular baby names."""

    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset"""
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]
        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """Retrieves a page of the dataset

        Args:
            page (int, optional): The page number (1-indexed).
            Default to 1.
            page_size (int, optional): The number of items per page.
            Defaults to 10.

            Returns:
                List[List]: The list of rows for the requested page
        """

        # Verify that the arguments are valid
        assert (
            isinstance(page, int) and page
            > 0, "Page must be a positive integer"
            )
        assert (
            isinstance(page_size, int) and page_size > 0
        ), "Page_size must be a positive integer"

        # Get the dataset
        dataset = self.dataset()
        total_items = len(dataset)

        # Calculate the start and end indces for the requested page.
        start_index, end_index = index_range(page, page_size)

        # Check if the requested page is within the range of the dataset
        if start_index >= total_items:
            return []

        # Return the appropraite page of the dataset
        return dataset[start_index: min(end_index, total_items)]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> dict:
        """
        Retrieves a dictionary of pagination-related information for a given
        page.
        Args:
            page (int, optional): The page number (1-indexed). Defaults to 1.
            page_size (int, optional): The number of itmes per page.
            Degaults to 10.

        Returns:
            dict: A dictionary containing the following key-value pairs
                    page_size: the length of the returned dataset
                    page: the current page number
                    data: the dataset page (equivalent to return from get_page)
                    next_page: number of the next page, None if not next page
                    prev_page: number of the previous page, None if no
                    previouse page.
                    total_pages: the total number of pages in the dataset as
                    an integer
        """
        # Get the dataset page
        data = self.get_page(page, page_size)

        # Calculate the total number of pages.
        total_items = len(self.dataset())
        total_pages = math.ceil(total_items / page_size)

        # Determine the next and previous page numbers
        next_page = page + 1 if page < total_pages else None
        preve_page = page - 1 if page > 1 else None

        return {
            "page_size": len(data),
            "page": page,
            "data": data,
            "next_page": next_page,
            "prev_page": preve_page,
            "total_pages": total_pages
        }
