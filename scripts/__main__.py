import asyncio
import json
import argparse
from typing import Optional

from aiohttp import ClientResponse
from yarl import URL
from loguru import logger

from client import Client

from uuid import UUID


async def run(*, base_url: Optional[str | URL] = None) -> None:
    # cache all the requests in a database
    """Run main script"""
    async with Client(base_url=base_url, debug=True) as client:
        async with client.get(url="/") as resp:
            resp: ClientResponse 
            resp.raise_for_status()
            if resp.status == 200:
                body_bytes = await resp.read()
                result = json.loads(body_bytes)
                print(f"body: {result}")

                request_elapsed_time = resp.headers.get("x-elapsed-time") 
                logger.debug({"elapsed-time": request_elapsed_time})

        # Put item
        data = {
            "name": "Foo",
            "desc": "An optional description",
            "price": 45.2,
            "tax": 3.5
        }

        async with client.post(url="/items/post", data=json.dumps(data), headers={"content-type": "application/json"}) as resp:
            resp.raise_for_status()
        
        # Get html page back
        id = UUID('{12345678-1234-5678-1234-567812345678}')
        async with client.get(url=f"/html/{id}") as resp: 
            resp.raise_for_status()
            if resp.status == 200:
                content_type = resp.headers.get("content-type")
                if content_type == "text/html":
                    html_page = await resp.read()
                    logger.debug({"html_page": html_page})
                else:
                    # TODO: Use ValueError()?
                    raise RuntimeError("Invalid content type")

                request_elapsed_time = resp.headers.get("x-elapsed-time") 
                logger.debug({"elapsed-time": request_elapsed_time})


if __name__ == "__main__":
    arg_parser = argparse.ArgumentParser(
        prog="url parser", 
        description="parse url for the client"
    )

    arg_parser.add_argument("--url", type=str, help="Base url for running server")

    args = arg_parser.parse_args()
    if args.url:
        asyncio.run(run(base_url=URL(args.url)))
    else:
        asyncio.run(run())
    