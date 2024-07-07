#!/usr/bin/env python3
"""
`Module 0-simple_helper_function`
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
