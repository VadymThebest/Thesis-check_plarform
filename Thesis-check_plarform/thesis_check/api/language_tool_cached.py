import os
from django.conf import settings

_LANGUAGE_TOOL = None


def get_language_tool():
    global _LANGUAGE_TOOL

    # Test ortamında tamamen kapat
    if getattr(settings, "TESTING", False):
        return None

    if _LANGUAGE_TOOL is None:
        import language_tool_python
        _LANGUAGE_TOOL = language_tool_python.LanguageTool("en-US")

    return _LANGUAGE_TOOL
