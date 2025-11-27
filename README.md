# Electron and Electron-based applications ports for FreeBSD

## For general users

Electron is available in the FreeBSD ports tree. For available Electron versions, please see the following URL:

- https://www.freshports.org/search.php?stype=name&method=prefix&query=electron

NOTE: Due to resource constraints in the package builders, binary packages may not be available in the official package repository. In that case, you will have to build/install Electron from ports for yourself.

## For curious users

This repository is a playground of the Electron ports maintainer and contains work-in-progress ports of Electron and Electron-based applications which are not yet included in the ports tree.

### Get

#### Electron:

For versions prior to being incorporated into the ports tree, binary packages for amd64 architecture are available on the Releases page. To install, download the file (with .pkg extension) and run the command:

``` shell
pkg install /path/to/the/downloaded/pkgfile.pkg
```

#### Electron-based applications:

There are no binary packages available.

### Run

Electron alone is not very interesting since it is a framework on which applications are built. Nevertheless, you can run the default application with the following command:

``` shell
electron
```

### Build

If you would like to build Electron or Electron-based applications for yourself, be sure you have the ports tree on your machine. If not, clone it using `git` command like:

``` shell
git clone https://git.freebsd.org/ports.git /your/ports/directory
```

Next, clone this repository into an arbitrary directory:

``` shell
git clone https://github.com/tagattie/FreeBSD-Electron.git
```

If you are going to build/install an Electron-based application, copy `electron.mk` and companion scripts to your ports directory:

``` shell
cd FreeBSD-Electron
cp -R Mk/* /your/ports/directory/Mk
```

Finally, change your working directory to a port of your choice and execute the following commands:

``` shell
cd devel/electron39  # for example
make install clean
```

## Credits

I would like to thank the following works on which Electron ports are largely based:

- Chromium patches by [FreeBSD/Chromium Team](https://wiki.freebsd.org/Chromium)
- Electron patches by @prash-wghats at [Electron-VSCode-Atom-For-FreeBSD](https://github.com/prash-wghats/Electron-VSCode-Atom-For-FreeBSD)
- Porting works by @freebsd-electron at [electron-port](https://github.com/freebsd-electron/electron-port)
