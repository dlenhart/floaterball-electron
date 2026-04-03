#!/bin/bash

set -e

PLATFORM=${1:-"all"}

case "$PLATFORM" in
  mac)
    echo "Building for macOS..."
    npx electron-builder --mac
    ;;
  linux)
    echo "Building for Linux..."
    npx electron-builder --linux
    ;;
  win)
    echo "Building for Windows..."
    npx electron-builder --win
    ;;
  all)
    echo "Building for all platforms..."
    npx electron-builder --mac --linux --win
    ;;
  *)
    echo "Usage: ./build.sh [mac|linux|win|all]"
    echo "  mac   - Build macOS DMG"
    echo "  linux - Build Linux (AppImage, deb, rpm, snap)"
    echo "  win   - Build Windows (NSIS installer, portable exe)"
    echo "  all   - Build all platforms (default)"
    exit 1
    ;;
esac

echo "Build complete. Output in ./dist/"
