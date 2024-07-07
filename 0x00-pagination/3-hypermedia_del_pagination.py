#!/usr/bin/env python3
"""
Deletion-resilient hypermedia pagination
"""

import csv
import math
from typing import List, Dict


class Server:
    """Server class to paginate a dataase of popular baby names."""

    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None
        self.__indexed_dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset"""
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
                self.__dataset = dataset[1:]
        return self.__dataset

    def indexed_dataset(self) -> Dict[int, List]:
        """Dataset indexed by sorting position, starting at 0"""
        if self.__indexed_dataset is None:
            dataset = self.dataset()
            truncated_dataset = dataset[:1000]
            self.__indexed_dataset = {i: dataset[i] for i in range(
                len(dataset))}
        return self.__indexed_dataset

    def get_hyper_index(self, index: int = None, page_size: int = 10) -> dict:
        """Returns a dictionary with key value pair"""
        assert index is None or (
            isinstance(index, int) and index >= 0
        ), "Index must be a non-negative integer or None"

        indexed_dataset = self.indexed_dataset()

        if index is None:
            start_index = 0
        else:
            start_index = index

        end_index = start_index + page_size

        end_index = min(end_index, len(indexed_dataset))

        data = []
        for i in range(start_index, end_index):
            if i in indexed_dataset:
                data.append(indexed_dataset[i])

        next_index = end_index

        return {
            "index": start_index,
            "next_index": next_index,
            "page_size": len(data),
            "data": data,
        }
