#!/usr/bin/env python3
"""
`Module 0-simple_helper_function`
Provides a function `index_range()` that takes two
two integers arguments.
"""


def index_range(page, page_size):
    """
    A helper function that returns a tuple of size two
    containing a start index and and end index
    Args:
    """
    start_index = (page - 1) * page_size
    end_index = start_index + page_size
    return (start_index, end_index)
