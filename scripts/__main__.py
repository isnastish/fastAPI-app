import asyncio
import json
import argparse
from typing import Optional

from aiohttp import ClientResponse
from yarl import URL

from client import Client


async def run(*, base_url: Optional[str | URL] = None) -> None:
    """Run main script"""
    async with Client(base_url=base_url, debug=True) as client:
        async with client.get(url="/") as resp:
            resp: ClientResponse 
            resp.raise_for_status()
            if resp.status == 200:
                body_bytes = await resp.read()
                result = json.loads(body_bytes)
                print(f"body: {result}")

        # Put item
        data = {
            "name": "Foo",
            "desc": "An optional description",
            "price": 45.2,
            "tax": 3.5
        }

        async with client.post(url="/items/post", data=json.dumps(data), headers={"content-type": "application/json"}) as resp:
            resp.raise_for_status()


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
    