#!/usr/bin/env python3

"""
`Module 1-fifo_cache`
Provides a class for that inherits from BaseCaching
"""

BaseCaching = __import__("base_caching").BaseCaching


class FIFOCache(BaseCaching):
    """
    FIFOCache class that inherits from BaseCaching
    """

    def __init__(self):
        """Initialize the cache."""
        super().__init__()

    def put(self, key, item):
        """Add an item  in the cache"""
        if key is None or item is None:
            return
        if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            # Discard the first item put in cache (FIFO algorithm)
            first_key = next(iter(self.cache_data))
            print("DISCARD: {}".format(first_key))
            del self.cache_data[first_key]

        self.cache_data[key] = item

    def get(self, key):
        """Get an item by key"""
        if key is None or key not in self.cache_data:
            return None
        return self.cache_data[key]
