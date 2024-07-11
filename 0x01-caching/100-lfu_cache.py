#!/usr/bin/env python3

"""
`Module 100-lfu_cache`
Provides a class that inherits from BaseCaching
"""

from collections import OrderedDict

BaseCaching = __import__("base_caching").BaseCaching


class LFUCache(BaseCaching):
    """
    LFUCache class that inherits from BaseCaching
    """

    def __init__(self):
        """Initialize the cache."""
        super().__init__()
        self.cache_data = {}
        self.frequncy = {}
        self.lru_order = OrderedDict()

    def put(self, key, item):
        """Add an item  in the cache"""
        if key is None or item is None:
            return

        if key in self.cache_data:
            self.frequncy[key] += 1
            self.lru_order.move_to_end(key)
        else:

            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                # Discard the least frequent used item (LFU algorithm)
                lfu_keys = [
                    k
                    for k, v in self.frequncy.items()
                    if v == min(self.frequncy.values())
                ]
                if len(lfu_keys) > 1:
                    # If more than one item has the same freq, LRU is
                    # used to discard
                    lru_key = next(iter(self.lru_order))
                    print("DISCARD: {}".format(lru_key))
                    del self.cache_data[lru_key]
                    del self.frequncy[lru_key]
                    self.lru_order.pop(lru_key)
                else:
                    lfu_key = lfu_keys[0]
                    print("DISCARD: {}".format(lfu_key))
                    del self.cache_data[lfu_key]
                    del self.frequncy[lfu_key]
                    self.lru_order.pop(lfu_key)

            self.cache_data[key] = item
            self.frequncy[key] = 1
            self.lru_order[key] = None

    def get(self, key):
        """Get an item by key"""
        if key is None or key not in self.cache_data:
            return None
        self.frequncy[key] += 1
        self.lru_order.move_to_end(key)
        return self.cache_data[key]
