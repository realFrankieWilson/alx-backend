#!/usr/bin/env python3

"""
`Module 3-lru_cache`
Provides a class that inherits from BaseCaching
"""

from collections import OrderedDict

BaseCaching = __import__("base_caching").BaseCaching


class LRUCache(BaseCaching):
    """
    LRUCache class that inherits from BaseCaching
    """

    def __init__(self):
        """Initialize the cache."""
        super().__init__()
        self.cache_data = OrderedDict()

    def put(self, key, item):
        """Add an item  in the cache"""
        if key is None or item is None:
            return

        # Moves the key corresponding key in self.cache_data to the end of
        # dictionary if the item exists exists
        if key in self.cache_data:
            self.cache_data.move_to_end(key)
        self.cache_data[key] = item

        if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            # Discard the first item put in cache (LIFO algorithm)
            least_recent_key = next(iter(self.cache_data))
            print("DISCARD: {}".format(least_recent_key))
            del self.cache_data[least_recent_key]

    def get(self, key):
        """Get an item by key"""
        if key is None or key not in self.cache_data:
            return None
        self.cache_data.move_to_end(key)
        return self.cache_data[key]
