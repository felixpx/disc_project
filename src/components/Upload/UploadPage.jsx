import { useRouter } from "next/router";
import { useState } from "react";
import { useMoralis } from "react-moralis";

export default function UploadPage() {
  const { Moralis, user } = useMoralis();
  // const { saveFile} =

  const router = useRouter();

  async function newUpload() {
    const title = document.getElementById("title").value;
    const price = document.getElementById("price").value;
    const SCLink = document.getElementById("SCLink").value;
    const description = document.getElementById("description").value;
    const fileUpload = document.getElementById("file-upload").files[0];
    const musicUpload = document.getElementById("music-upload").files[0];
    const collaborator = document.getElementById("collaborator").value;
    const label = document.getElementById("label").value;

    // save files to ipfs

    let ipfsIMG = "";
    let ipfsTrack = "";

    if (fileUpload) {
      console.log("uploading pet photo");
      await saveFile("fileUpload", fileUpload, { saveIPFS: true }).then(
        async (hash) => {
          ipfsIMG = hash._ipfs;
        }
      );
    }
    if (musicUpload) {
      console.log("uploading pet photo");
      await saveFile("musicUpload", musicUpload, { saveIPFS: true }).then(
        async (hash) => {
          ipfsTrack = hash._ipfs;
        }
      );
    }

    // storing data in moralis

    const Track = new Moralis.Object.extend("Track");
    const track = new Track();

    track.set("owner", user.get("ethAddress"));
    track.set("title", title);
    track.set("price", price);
    track.set("SCLink", SCLink);
    track.set("description", description);
    track.set("ipfsIMG", ipfsIMG);
    track.set("ipfsTrack", ipfsTrack);
    track.set("collaborator", collaborator);
    track.set("label", label);
    track.save().then(async (p) => {
      // do something here
    });
  }

  // UPLOAD

  return (
    <div className="space-y-8 divide-y divide-gray-200 w-full md:w-9/12">
      <div className="space-y-8 divide-y divide-gray-200">
        <div className="">
          <div className="pt-16 pb-4">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Upload
            </h3>
            <p className="mt-1 text-sm text-gray-500">Upload music for sale</p>
          </div>
          <div className="flex flex-row items-center justify-evenly space-x-8  w-full ">
            <div className="flex flex-col w-full">
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                {/* TRACK TITLE */}
                <div className="sm:col-span-6 w-full">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <div className="mt-1 flex w-full rounded-md shadow-sm">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      autoComplete="title"
                      className="block w-full min-w-0 flex-1  rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                {/* price input */}
                <div className="sm:col-span-6 w-full">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Price per copy in MATIC
                  </label>
                  <div className="mt-1 flex w-full rounded-md shadow-sm">
                    <input
                      type="number"
                      name="price"
                      id="price"
                      autoComplete="price"
                      className="block w-full min-w-0 flex-1  rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                {/* LINK */}
                <div className="sm:col-span-6 w-full">
                  <label
                    htmlFor="SCLink"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Soundcloud link
                  </label>
                  <div className="mt-1 flex w-full rounded-md shadow-sm">
                    <input
                      type="text"
                      name="SCLink"
                      id="SCLink"
                      autoComplete="title"
                      className="block w-full min-w-0 flex-1  rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  {/* <p className="mt-2 text-sm text-gray-500">embed your track</p> */}
                </div>
                {/* about */}
                <div className="sm:col-span-6">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      defaultValue={""}
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Write a few sentences about this item
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-8 w-full ">
              {/* cover img */}
              <div className="sm:col-span-6">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Cover photo
                </label>
                <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload img</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:col-span-6">
                <label
                  htmlFor="cover-music"
                  className="block text-sm font-medium text-gray-700"
                >
                  Music
                </label>
                <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="music-upload"
                        className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload music</span>
                        <input
                          id="music-upload"
                          name="music-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Additional Information
            </h3>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="collaborator"
                className="block text-sm font-medium text-gray-700"
              >
                Collaborator
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="collaborator"
                  id="collaborator"
                  autoComplete="collaborator"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                add email or wallet address (ethereum) of a collaborator
              </p>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="label"
                className="block text-sm font-medium text-gray-700"
              >
                Label
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="label"
                  id="label"
                  autoComplete="label"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                add email or wallet address (ethereum) of a label
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            onClick={() => {
              router.push("/collection");
            }}
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            onClick={newUpload}
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
