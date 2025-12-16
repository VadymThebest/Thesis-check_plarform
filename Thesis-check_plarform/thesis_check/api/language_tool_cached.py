import os
import language_tool_python


# Initialize LanguageTool using the cache directory
# This will download the LT zip only once
LANGUAGE_TOOL = language_tool_python.LanguageTool(
    'en-US',
)
