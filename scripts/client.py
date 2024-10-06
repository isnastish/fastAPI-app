from typing import Optional
from contextlib import asynccontextmanager, AsyncExitStack
from aiohttp import ClientSession
from yarl import URL
from loguru import logger


class Client:
    def __init__(self, *, base_url: Optional[URL | str] = None, debug: bool = False) -> None:
        self._base_url = URL(base_url) if base_url else URL("http://127.0.0.1:8000")
        self._exit_stack: AsyncExitStack = None
        self._session: ClientSession = None
        self._debug = debug
        
        if debug:
            logger.debug({"base_url": self._base_url})

    
    async def __aenter__(self) -> ClientSession:
        if self._debug:
            logger.debug("entering async context")

        if self._exit_stack:
            raise ValueError("Exit stack cannot be initialized more than once")
        
        self._exit_stack = AsyncExitStack()
        
        self._session = await self._exit_stack.enter_async_context(
            ClientSession(base_url=self._base_url)
        )

        return self._session

    
    async def __aexit__(self, exc_type, exc_value, traceback):
        if self._debug:
            logger.debug("exiting async context")

        if self._exit_stack:
            await self._exit_stack.aclose()


@asynccontextmanager
async def init_client(base_url: Optional[URL | str] = None, debug: bool = False):
    async with Client(base_url=base_url, debug=debug) as client:
        yield client