"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import { X, Plus, ChevronLeft, ChevronRight } from "lucide-react";
// import { Dialog, DialogContent, DialogClose } from "@radix-ui/react-dialog";
// import { Button } from "@radix-ui/react-button";
// import { Input } from "@radix-ui/react-input";
// import { Badge } from "@radix-ui/react-badge";
// import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Button, Input, Badge } from "@mui/material";
import { Dialog, DialogContent } from "@mui/material"; // Dialog from Material UI

// Mock data for the gallery
const initialPhotos = [
  {
    id: 1,
    src: "/images/IMG_1470.JPG", // ✅ fixed
    tags: ["John", "Ken, Toni, GDee, GKen, Tom"],
  },

  { id: 2, src: "/placeholder.svg?height=300&width=300", tags: ["John"] },
  { id: 3, src: "/placeholder.svg?height=300&width=300", tags: ["Sarah"] },
  {
    id: 4,
    src: "/placeholder.svg?height=300&width=300",
    tags: ["Mary", "Sarah"],
  },
  { id: 5, src: "/placeholder.svg?height=300&width=300", tags: [] },
  {
    id: 6,
    src: "/placeholder.svg?height=300&width=300",
    tags: ["John", "Sarah"],
  },
];

export default function MemorialGallery() {
  const [photos, setPhotos] = useState(initialPhotos);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [newTag, setNewTag] = useState("");
  const [filter, setFilter] = useState(null);

  const allTags = Array.from(new Set(photos.flatMap((photo) => photo.tags)));

  const filteredPhotos = filter
    ? photos.filter((photo) => photo.tags.includes(filter))
    : photos;

  const addTag = (photoId, tag) => {
    setPhotos(
      photos.map((photo) =>
        photo.id === photoId
          ? { ...photo, tags: [...new Set([...photo.tags, tag])] }
          : photo
      )
    );
    setNewTag("");
  };

  const removeTag = (photoId, tagToRemove) => {
    setPhotos(
      photos.map((photo) =>
        photo.id === photoId
          ? { ...photo, tags: photo.tags.filter((tag) => tag !== tagToRemove) }
          : photo
      )
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Memorial Gallery</h1>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Filter by Tag:</h2>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <Badge
              key={tag}
              variant={filter === tag ? "default" : "secondary"}
              className="cursor-pointer"
              onClick={() => setFilter(filter === tag ? null : tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            className="relative aspect-square overflow-hidden rounded-lg border border-gray-200 cursor-pointer"
            onClick={() => setSelectedPhoto(photo)}
          >
            <Image
              src={photo.src}
              alt={`Memorial photo ${photo.id}`}
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
              <div className="flex flex-wrap gap-1">
                {photo.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog
        open={!!selectedPhoto}
        onOpenChange={() => setSelectedPhoto(null)}
      >
        <DialogContent className="sm:max-w-[80vw] sm:max-h-[90vh] flex flex-col">
          <div className="relative flex-grow">
            {selectedPhoto && (
              <Image
                src={selectedPhoto.src}
                alt={`Memorial photo ${selectedPhoto.id}`}
                layout="fill"
                objectFit="contain"
              />
            )}
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Tags:</h3>
            {/* <ScrollArea className="h-20"> */}
            <div className="flex flex-wrap gap-2">
              {selectedPhoto?.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-sm flex items-center gap-1"
                >
                  {tag}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() =>
                      selectedPhoto && removeTag(selectedPhoto.id, tag)
                    }
                  />
                </Badge>
              ))}
            </div>
            {/* </ScrollArea> */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (selectedPhoto && newTag) {
                  addTag(selectedPhoto.id, newTag);
                }
              }}
              className="flex gap-2 mt-2"
            >
              <Input
                type="text"
                placeholder="Add new tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
              />
              <Button type="submit" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </form>
          </div>
          <div className="flex justify-between mt-4">
            <Button
              variant="outline"
              onClick={() => {
                const currentIndex = photos.findIndex(
                  (p) => p.id === selectedPhoto?.id
                );
                const prevPhoto =
                  photos[currentIndex - 1] || photos[photos.length - 1];
                setSelectedPhoto(prevPhoto);
              }}
            >
              <ChevronLeft className="h-4 w-4 mr-2" /> Previous
            </Button>
            {/* <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose> */}
            <Button
              variant="outline"
              onClick={() => {
                const currentIndex = photos.findIndex(
                  (p) => p.id === selectedPhoto?.id
                );
                const nextPhoto = photos[currentIndex + 1] || photos[0];
                setSelectedPhoto(nextPhoto);
              }}
            >
              Next <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
